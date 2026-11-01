import { Link } from 'react-router-dom'

const images = import.meta.glob('../img/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

function Home() {
  return (
    <main id="inicio">
      <section
        id="banner"
        style={{
          '--banner-url': `url("${images['../img/banner.jpg']}")`,
        }}
      >
        <div className="escada">
          <h1>Next</h1>
          <h1 className="degrau2">Wave</h1>
        </div>

        <p className="desc">
          Focamos em tecnologia e inovação, desenvolvendo soluções que acompanham as necessidades de um mundo cada vez mais conectado.
        </p>

        <a href="#solucao" className="btn">
          Conheça nosso projeto
        </a>
      </section>

      <section className="jovi_soluction" id="solucao">
        <h2>Nossa solução</h2>
        <span />
        <h2 className="subtitulo">Jovi Smart Camera</h2>

        <div className="conteudo">
          <img
            className="v70"
            src={images['../img/celular_jovi.png']}
            alt="Jovi Smart Camera no celular"
          />

          <article className="definicao">
            <h3>O que é a Jovi Smart Camera?</h3>
            <p>
              A Jovi Smart Camera é uma solução desenvolvida para ajudar estudantes a registrarem conteúdos de aula com mais qualidade e aproveitarem melhor suas anotações.
            </p>
          </article>

          <article className="feedback">
            <h3>Captura inteligente</h3>
            <p>
              O estudante fotografa lousas, slides e materiais com o smartphone, recebendo feedback em tempo real sobre a qualidade da imagem. A solução identifica problemas como iluminação, nitidez, enquadramento e distância, ajudando a obter uma captura melhor.
            </p>
          </article>

          <article className="organizacao">
            <h3>Organização para os estudos</h3>
            <p>
              Os conteúdos capturados são organizados de acordo com suas respectivas matérias para facilitar a consulta e a revisão posteriormente, transformando uma simples fotografia de aula em um recurso de estudo mais útil, organizado e acessível.
            </p>
          </article>

          <article className="objetivo">
            <h3>Objetivo</h3>
            <p>
              O objetivo é reduzir a perda de informações causada por fotos difíceis de visualizar ou mal registradas, tornando o processo de captura e revisão dos conteúdos mais eficiente para o estudante.
            </p>
          </article>
        </div>
        <div className="flex justify-center py-6">
          <Link to="/app" className="btn mt-1!">
            Testar a câmera
          </Link>
        </div>
      </section>

      <section className="alvo" id="publico">
        <h2>Quem é nosso público-alvo?</h2>

        <div className="desc_publico">
          <p>
            A solução é direcionada principalmente a estudantes full-time,
            especialmente aqueles que utilizam o celular como apoio à rotina
            acadêmica.
          </p>
          <p>
            Esse público está constantemente exposto a informações apresentadas em diferentes formatos, como lousas, slides, anotações e materiais compartilhados em sala de aula. Por isso, estudantes que precisam registrar, armazenar e revisar uma grande quantidade de conteúdos durante a rotina de estudos são o principal foco do projeto.
          </p>
          <p>
            A Jovi Smart Camera foi pensada para esse perfil por estar inserida em um contexto em que praticidade, rapidez e facilidade de acesso às informações são importantes para acompanhar as atividades acadêmicas. A organização dos registros por matéria também contribui para que os estudantes encontrem seus conteúdos de forma mais rápida e mantenham seus materiais de estudo mais organizados.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home