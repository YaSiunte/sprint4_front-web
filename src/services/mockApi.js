function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function analyzeCapture(file) {
  await wait(350)

  // Pontuação demonstrativa, não é uma análise real da imagem.
  const score = Math.min(98, 76 + Math.round(file.size % 23))
  const tips =
    score > 86
      ? ['A imagem está pronta para revisar.', 'Organize por matéria.']
      : ['Aproxime o celular da lousa.', 'Confira a nitidez e a iluminação.']

  return {
    score,
    title: score > 86 ? 'Boa captura!' : 'Quase lá!',
    tips,
  }
}

export async function getSubjects() {
  await wait(180)
  return ['Matemática', 'História', 'Biologia', 'Outras matérias']
}