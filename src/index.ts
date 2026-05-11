import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { z } from "zod";

const server = new McpServer({
  name: "node-mcp",
  version: "0.0.1",
});
