import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// inyectar las keys o valores de los secretos
import { PORT } from "./keys/keys.js";

// módulo enrutador
import userRoutes from "./router/router.js";

// configuración básica
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);