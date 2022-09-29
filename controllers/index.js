// req ---> recibe los datos
// res ---> responde al cliente
//req.params ---> Recibimos datos que llegan por la URL pero son obligatorios
//req.query --->Recibimos los datos que llegan por la URL pero son opcionales
//req.body ---> Recibimos los datos que llegan por el body

//obtener
const obtener = (req, res) => {
  res.status(201).send({
    message: "hola mundo",
  });
};

//suma
//localhost:3000/api/suma?num1=1&num2=5
const suma = (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  const resultado = num1 + num2;
  res.status(200).send({
    reusltado: resultado,
  });
};

//obtener usuario
const obtenerusuario = (req, res) => {
  const name = req.params.name;
  res.status(200).send({
    usuario: name,
  });
};
//modificar usuario
const modificarusuario = (req, res) => {
  res.status(200).send(req.body);
};

module.exports = {
  obtener,
  suma,
  obtenerusuario,
  modificarusuario,
};
