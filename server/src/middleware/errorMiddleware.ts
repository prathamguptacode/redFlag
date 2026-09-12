import { ErrorRequestHandler } from "express";

const errHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  return res.status(error.status || 500).json({ message: error.message || "Server internal error" })
}

export default errHandler
