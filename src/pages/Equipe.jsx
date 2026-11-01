const images = import.meta.glob('../img/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const members = [
  {
    name: 'Lavínia Dantas',
    photo: 'foto3.jpg',
    description:
      'Desenvolvimento e Design: responsável pela estruturação da interface da solução, desenvolvimento das telas e organização visual do sistema, buscando proporcionar uma experiência simples e intuitiva para o estudante.',
  },
  {
    name: 'Yasmin Siunte',
    photo: 'foto1.jpg',
    description:
      'Desenvolvimento e Inteligência da Solução: responsável pela implementação das funcionalidades da Jovi Smart Camera, especialmente pelo desenvolvimento do sistema de feedback inteligente para identificação de problemas nas imagens, como baixa iluminação, falta de nitidez e enquadramento inadequado.',
  },
]

function Equipe() {
  return (
    <main className="equipe" id="nos">
      {members.map((member) => (
        <div className="integrante" key={member.name}>
          <img
            className="fotos"
            src={images[`../img/${member.photo}`]}
            alt={`Foto de ${member.name}`}
          />

          <div className="conteudo_integrante">
            <h2 className="nomes">{member.name}</h2>
            <p className="funcao">{member.description}</p>
          </div>
        </div>
      ))}
    </main>
  )
}

export default Equipe