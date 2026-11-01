import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCapture } from '../hooks/useCapture.js'
import { getSubjects } from '../services/mockApi.js'

function CameraApp() {
  const { user, logout } = useAuth()
  const { result, loading, analyze } = useCapture()

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [subjects, setSubjects] = useState([])
  const [subject, setSubject] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [captures, setCaptures] = useState(() =>
    JSON.parse(localStorage.getItem('nextwave-captures') || '[]'),
  )
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    getSubjects().then((availableSubjects) => {
      const customSubjects = JSON.parse(
        localStorage.getItem('nextwave-custom-subjects') || '[]',
      )
      const allSubjects = [
        ...new Set([...availableSubjects, ...customSubjects]),
      ]

      setSubjects(allSubjects)
      setSubject(allSubjects[0] || '')
    })
  }, [])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  async function handleStartCamera() {
    setCameraError('')

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Câmera indisponível neste navegador.')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })

      streamRef.current = stream
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setCameraActive(true)
    } catch {
      setCameraError(
        'Não foi possível acessar a câmera. Confira a permissão do navegador.',
      )
    }
  }

  function handleStopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCameraActive(false)
  }

  async function handleCapture() {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas || !video.videoWidth) {
      return
    }

    const scale = Math.min(
      1,
      1200 / video.videoWidth,
      1200 / video.videoHeight,
    )

    canvas.width = Math.round(video.videoWidth * scale)
    canvas.height = Math.round(video.videoHeight * scale)

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.85)
    })

    if (!imageBlob) {
      setCameraError('Não foi possível capturar a imagem. Tente novamente.')
      return
    }

    const capturedFile = new File(
      [imageBlob],
      `captura-${Date.now()}.jpg`,
      { type: 'image/jpeg' },
    )

    setFile(capturedFile)
    setPreview(canvas.toDataURL('image/jpeg', 0.85))
    setCameraError('')
    setStorageError('')
    analyze(capturedFile)
  }

  function handleRetake() {
    setFile(null)
    setPreview('')
    setStorageError('')
  }

  function handleAddSubject() {
    const name = newSubject.trim()

    if (!name) {
      return
    }

    const existingSubject = subjects.find(
      (item) => item.toLowerCase() === name.toLowerCase(),
    )

    if (existingSubject) {
      setSubject(existingSubject)
      setNewSubject('')
      return
    }

    const updatedSubjects = [...subjects, name]
    const customSubjects = JSON.parse(
      localStorage.getItem('nextwave-custom-subjects') || '[]',
    )

    localStorage.setItem(
      'nextwave-custom-subjects',
      JSON.stringify([...customSubjects, name]),
    )

    setSubjects(updatedSubjects)
    setSubject(name)
    setNewSubject('')
  }

  function handleSave() {
    if (!file || !result || !preview || !subject) {
      return
    }

    const newCapture = {
      id: crypto.randomUUID(),
      name: file.name,
      subject,
      preview,
      score: result.score,
      date: new Date().toLocaleDateString('pt-BR'),
    }
    const updatedCaptures = [newCapture, ...captures]

    try {
      localStorage.setItem(
        'nextwave-captures',
        JSON.stringify(updatedCaptures),
      )
      setCaptures(updatedCaptures)
      setFile(null)
      setPreview('')
      setStorageError('')
    } catch {
      setStorageError(
        'Não foi possível salvar. O armazenamento do navegador pode estar cheio.',
      )
    }
  }

  function handleRemove(id) {
    const updatedCaptures = captures.filter((capture) => capture.id !== id)

    setCaptures(updatedCaptures)
    localStorage.setItem(
      'nextwave-captures',
      JSON.stringify(updatedCaptures),
    )
  }

  const capturesBySubject = captures.reduce((groups, capture) => {
    const subjectName = capture.subject || 'Sem matéria'

    if (!groups[subjectName]) {
      groups[subjectName] = []
    }

    groups[subjectName].push(capture)
    return groups
  }, {})

  return (
    <main className="mx-auto min-h-[75vh] w-full max-w-6xl px-4 pb-12 pt-28 text-[#1c0c38] sm:px-8">
      <Link className="mb-5 inline-block text-sm underline" to="/">
        ← Voltar ao site
      </Link>

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#79667e]">
            Jovi Smart Camera
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Olá, {user.split(' ')[0]}!
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#4d3a6b]">
            Capture uma imagem da aula, receba dicas e organize suas fotos por
            matéria.
          </p>
        </div>

        <button
          className="rounded-lg border border-[#79667e] px-4 py-2 text-sm transition hover:bg-[#79667e49]"
          onClick={logout}
        >
          Sair
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-[20px] border-2 border-[#79667e] bg-[#79667e49] p-5 shadow-md sm:p-7">
          <h2 className="mb-2 text-center text-2xl font-bold">
            Nova captura
          </h2>
          <p className="mb-5 text-sm text-[#4d3a6b]">
            Ative a câmera e capture uma foto de lousa, slide ou material.
          </p>

          <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#79667e] bg-[#dcd7d5] p-4 text-center">
            {!cameraActive && !preview && (
              <p className="text-sm text-[#4d3a6b]">
                Ative a câmera para começar.
              </p>
            )}

            {preview && (
              <img
                className="max-h-60 max-w-full rounded-lg object-contain"
                src={preview}
                alt="Prévia da imagem capturada"
              />
            )}

            <video
              ref={videoRef}
              className={`${
                cameraActive && !preview ? 'block' : 'hidden'
              } max-h-60 w-full rounded-lg bg-black object-contain`}
              autoPlay
              playsInline
              muted
            />

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {cameraError && (
            <p className="mt-3 text-sm text-red-800" role="alert">
              {cameraError}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="flex-1 rounded-lg border border-[#79667e] px-3 py-2 text-sm transition hover:bg-[#79667e49] disabled:opacity-50"
              onClick={handleStartCamera}
              disabled={cameraActive}
            >
              {cameraActive ? 'Câmera ativa' : 'Ativar câmera'}
            </button>

            <button
              className="flex-1 rounded-lg bg-[#79667e] px-3 py-2 text-sm font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleCapture}
              disabled={!cameraActive || loading}
            >
              {loading ? 'Analisando…' : 'Capturar foto'}
            </button>

            <button
              className="rounded-lg border border-[#79667e] px-3 py-2 text-sm transition hover:bg-[#79667e49] disabled:opacity-50"
              onClick={handleStopCamera}
              disabled={!cameraActive}
            >
              Desativar câmera
            </button>

            {preview && (
              <button
                className="rounded-lg border border-[#79667e] px-3 py-2 text-sm transition hover:bg-[#79667e49]"
                onClick={handleRetake}
              >
                Capturar novamente
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="subject">
              Organizar por matéria
            </label>
            <select
              className="rounded-md border border-[#79667e] bg-[#dcd7d5] px-3 py-3"
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              {subjects.map((availableSubject) => (
                <option key={availableSubject}>{availableSubject}</option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              className="min-w-0 flex-1 rounded-md border border-[#79667e] bg-[#dcd7d5] px-3 py-3"
              value={newSubject}
              onChange={(event) => setNewSubject(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleAddSubject()
                }
              }}
              placeholder="Ou digite outra matéria"
              aria-label="Nome da nova matéria"
            />
            <button
              className="rounded-md border border-[#79667e] px-4 py-2 transition hover:bg-[#79667e49] disabled:opacity-50"
              type="button"
              disabled={!newSubject.trim()}
              onClick={handleAddSubject}
            >
              Adicionar matéria
            </button>
          </div>

          {file && (
            <div className="mt-4 rounded-md border-l-4 border-[#79667e] bg-[#dcd7d5] p-4 text-sm">
              {loading ? (
                <p>Analisando a imagem…</p>
              ) : (
                result && (
                  <>
                    <strong>
                      {result.score}% — {result.title}
                    </strong>
                    <ul className="mt-2 list-inside list-disc">
                      {result.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )
              )}
            </div>
          )}

          {storageError && (
            <p className="mt-3 text-sm text-red-800">{storageError}</p>
          )}

          <button
            className="mt-4 w-full rounded-lg border-2 border-[#dcd7d5] bg-[#79667e] px-4 py-3 font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!file || loading || !result || !subject}
            onClick={handleSave}
          >
            Salvar na matéria
          </button>
        </section>

        <section className="rounded-[20px] border-2 border-[#79667e] bg-[#79667e49] p-5 shadow-md sm:p-7">
          <h2 className="mb-5 text-center text-2xl font-bold">
            Minhas capturas
          </h2>

          {Object.keys(capturesBySubject).length === 0 ? (
            <p className="py-10 text-center text-sm text-[#4d3a6b]">
              Suas imagens salvas aparecerão aqui, organizadas por matéria.
            </p>
          ) : (
            <div className="flex max-h-[30rem] flex-col gap-5 overflow-y-auto">
              {Object.entries(capturesBySubject).map(
                ([subjectName, subjectCaptures]) => (
                  <div
                    className="rounded-lg border border-[#79667e] p-3"
                    key={subjectName}
                  >
                    <h3 className="mb-3 border-b border-[#79667e] pb-2 font-bold">
                      {subjectName} ({subjectCaptures.length})
                    </h3>

                    <div className="flex flex-col gap-3">
                      {subjectCaptures.map((capture) => (
                        <article
                          className="flex min-w-0 items-center gap-3 rounded-lg bg-[#dcd7d5] p-3"
                          key={capture.id}
                        >
                          <img
                            className="h-14 w-14 rounded object-cover"
                            src={capture.preview}
                            alt=""
                          />
                          <div className="min-w-0 flex-1 space-y-1">
                            <strong className="block truncate text-sm">
                              {capture.name}
                            </strong>
                            <div className="text-xs">{capture.date}</div>
                            <div className="text-xs">
                              Qualidade: {capture.score}%
                            </div>
                          </div>
                          <button
                            className="rounded px-2 py-1 text-xs underline"
                            aria-label={`Excluir ${capture.name}`}
                            onClick={() => handleRemove(capture.id)}
                          >
                            Excluir
                          </button>
                        </article>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </section>
      </div>

    </main>
  )
}

export default CameraApp