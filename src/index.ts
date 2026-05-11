import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "node-mcp",
  version: "0.0.1",
});

server.registerTool(
  "add-numbers",
  {
    title: "Add numbers",
    description: "Add two numbers",
    inputSchema: {
      a: z.number().describe("First number"),
      b: z.number().describe("Secont number"),
    },
  },
  ({ a, b }) => {
    return {
      content: [{ type: "text", text: `Total is ${a + b}` }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error in main!: ", error);
  process.exit(1);
});
