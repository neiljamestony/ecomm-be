import net from "net";

interface CustomError extends Error {
  code?: string;
}

export const checkPort = (port: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err: CustomError) => {
      if (err.code === "EADDRINUSE") resolve(false);
      reject(err);
    });

    server.once("listening", () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

export const findAvailablePort = async (port: number): Promise<number> => {
  let isAvailable: boolean = false;
  while (!isAvailable) {
    isAvailable = await checkPort(port);
    if (!isAvailable) ++port;
  }
  return port;
};
