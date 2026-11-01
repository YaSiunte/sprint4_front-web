import { useEffect } from 'react'

const images = import.meta.glob('../img/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const galleryItems = [
  { file: 'item1.jpg', description: 'Imagem da galeria 1' },
  { file: 'item2.jpg', description: 'Imagem da galeria 2' },
  { file: 'item3.jpg', description: 'Imagem da galeria 3' },
  { file: 'item4.jpg', description: 'Imagem da galeria 4' },
  { file: 'item5.jpg', description: 'Imagem da galeria 5' },
  { file: 'feedback2.jpg', description: 'Feedback da solução' },
  { file: 'vantagem.jpg', description: 'Vantagens da solução' },
]

function Galeria() {
    useEffect(() => {
  document.body.classList.add('page_galeria')

  return () => {
    document.body.classList.remove('page_galeria')
  }
}, [])
  return (
    <main className="page_galeria">
      <section className="gallery" id="galeria">
        {galleryItems.map((item, index) => (
          <div
            key={item.file}
            className={`item img${index + 1}`}
            role="img"
            aria-label={item.description}
            style={{
              backgroundImage: `url("${images[`../img/${item.file}`]}")`,
            }}
          />
        ))}
      </section>
    </main>
  )
}

export default Galeria