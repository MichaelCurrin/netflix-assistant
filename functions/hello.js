exports.handler = async function (_event, _context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
