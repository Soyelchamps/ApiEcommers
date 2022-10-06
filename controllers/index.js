const connect = require("../database");
const { createToken } = require("../utils");

// req ---> recibe los datos
// res ---> responde al cliente
//req.params ---> Recibimos datos que llegan por la URL pero son obligatorios
//req.query --->Recibimos los datos que llegan por la URL pero son opcionales
//req.body ---> Recibimos los datos que llegan por el body

////////PRODUCTS ////////

//Create products
const createProduct = async (req, res) => {
  const {
    product_name,
    description,
    price,
    category,
    brand,
    sku,
    image,
    quantity,
    isactive,
  } = req.body;
  try {
    const products = await connect.query(
      `
      INSERT INTO products (
        product_name,
        description,
        price,
        category,
        brand,
        sku,
        image,
        quantity,
        isactive ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )`,
      [
        product_name,
        description,
        price,
        category,
        brand,
        sku,
        image,
        quantity,
        isactive,
      ]
    );
    if (products.rowCount > 0) {
      res.status(200).send({
        message: "Producto creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el producto",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Read all products
const getProducts = async (req, res) => {
  try {
    const products = await connect.query(" SELECT * FROM products ");
    res.status(200).send({
      data: products.rows,
    });
    console.log(products.rows);
  } catch (error) {
    res.status(404).send({
      error,
    });
    console.log(error);
  }
};

//Read 1 Product
const getProduct = async (req, res) => {
  const id = req.params.idProduct;
  try {
    const dbResponse = await connect.query(
      "SELECT * FROM products WHERE id_product = $1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "El producto no fue encontrado",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

//ModifyProduct
const modifyProduct = async (req, res) => {
  const id = req.params.idProduct;
  const {
    product_name,
    description,
    price,
    category,
    brand,
    sku,
    image,
    quantity,
    isactive,
  } = req.body;

  try {
    const products = await connect.query(
      `
      UPDATE products SET
      product_name = $1,
      description = $2,
      price = $3,
      category = $4,
      brand = $5,
      sku = $6,
      image = $7,
      quantity = $8,
      isactive =$9 
      WHERE id_product = $10`,

      [
        product_name,
        description,
        price,
        category,
        brand,
        sku,
        image,
        quantity,
        isactive,
        id,
      ]
    );

    if (products.rowCount > 0) {
      res.status(200).send({
        message: "Producto  Modificado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo modifcar el producto",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  const id = req.params.idProduct;
  try {
    const products = await connect.query(
      `
      UPDATE products SET
      isactive = FALSE 
      WHERE id_product = $1`,
      [id]
    );

    if (products.rowCount > 0) {
      res.status(200).send({
        message: "Producto Eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el producto",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//////////USERS///////////

//Create User
const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    password,
    type,
  } = req.body;
  try {
    const products = await connect.query(
      `
      INSERT INTO users (
	        first_name,
          last_name,
          date_of_birth,
          gender,
          email,
          password,
          type ) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf')), $7)`,
      [first_name, last_name, date_of_birth, gender, email, password, type]
    );
    if (products.rowCount > 0) {
      res.status(200).send({
        message: "Usuario creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el usuario ",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Read all users
const getUsers = async (req, res) => {
  try {
    const users = await connect.query(" SELECT * FROM users ");
    res.status(200).send({
      data: users.rows,
    });
    console.log(users.rows);
  } catch (error) {
    res.status(404).send({
      error,
    });
    console.log(error);
  }
};

//Read 1 User
const getUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const dbResponse = await connect.query(
      "SELECT * FROM users WHERE id_user = $1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "El usuario no fue encontrado",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

//ModifyUser
const modifyUser = async (req, res) => {
  const id = req.params.idUser;
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    password,
    type,
  } = req.body;
  try {
    const user = await connect.query(
      `UPDATE users SET  
        first_name = $1,
        last_name = $2,
        date_of_birth = $3,
        gender = $4,
        email = $5,
        password = $6,
        type = $7
      WHERE id_user = $8`,
      [first_name, last_name, date_of_birth, gender, email, password, type, id]
    );
    console.log(user);
    if (user.rowCount > 0) {
      res.status(200).send({
        message: "Usuario  Modificado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo modifcar el Usuario",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const dbResponse = await connect.query(
      `DELETE FROM users WHERE id_user = $1`,
      [id]
    );

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Usuario eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el usuario.",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

//////////INVOICES///////////

//Create Invoice
const createInvoice = async (req, res) => {
  const { id_user, order_date } = req.body;
  try {
    const invoice = await connect.query(
      `
      INSERT INTO invoices (
	      id_user,
	      order_date) 
      VALUES ($1, $2)`,
      [id_user, order_date]
    );
    if (invoice.rowCount > 0) {
      res.status(200).send({
        message: "Factura creada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear la factura",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Read all Invoice
const getInvoices = async (req, res) => {
  try {
    const invoice = await connect.query(" SELECT * FROM invoices ");
    res.status(200).send({
      data: invoice.rows,
    });
    console.log(invoice.rows);
  } catch (error) {
    res.status(404).send({
      error,
    });
    console.log(error);
  }
};

//Read 1 Invoice
const getInvoice = async (req, res) => {
  const id = req.params.idInvoice;
  try {
    const dbResponse = await connect.query(
      "SELECT * FROM invoices WHERE id_invoices = $1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "La factura no fue encontrada",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

//ModifyInvoice
const modifyInvoice = async (req, res) => {
  const id = req.params.idInvoice;
  const { id_user, order_date } = req.body;
  try {
    const invoice = await connect.query(
      `UPDATE invoices SET
        id_user = $1,
	      order_date = $2
        WHERE id_invoices = $3`,
      [id_user, order_date, id]
    );
    if (invoice.rowCount > 0) {
      res.status(200).send({
        message: "Factura Modificada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo modificar la factura",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

//Delete Invoice
const deleteInvoice = async (req, res) => {
  const id = req.params.idInvoice;
  try {
    const dbResponse = await connect.query(
      `DELETE FROM invoices WHERE id_invoices = $1`,
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Factura Eliminada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar la factura.",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  const { email, bodyPassword } = req.body;

  try {
    const dbResponse = await connect.query(
      "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)",
      [email, bodyPassword]
    );

    if (dbResponse.rowCount > 0) {
      const data = {
        id: dbResponse.rows[0].id_user,
        email: dbResponse.rows[0].email,
      };
      const token = createToken(data);
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "Usuario o contraseña incorrectos.",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  modifyProduct,
  deleteProduct,
  createUser,
  getUsers,
  getUser,
  modifyUser,
  deleteUser,
  createInvoice,
  getInvoices,
  getInvoice,
  modifyInvoice,
  deleteInvoice,
  loginController,
};
