import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const server = new McpServer({
  name: "node-mcp",
  version: "0.0.1",
});

// TOOL: Test add 2 numbers
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

// TOOL: Get github repo from given username
server.registerTool(
  "get_github_repos",
  {
    title: "Get Github Repos",
    description: "Simple get Github Repo from the given username",
    inputSchema: {
      username: z.string().describe("Github username"),
    },
  },
  async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { "User-Agent": "MCP-Server" },
    });

    if (!res.ok) throw new Error("Github API error!");

    const repos = await res.json();

    const repoList = repos
      .map((repo: any, i: number) => `${i + 1}. ${repo.name}`)
      .join("\n\n");

    return {
      content: [
        {
          type: "text",
          text: `Github repositories for ${username}: (${repos.length} repos): \n\n${repoList}`,
        },
      ],
    };
  },
);

// RESOURCES: Set up the building rules
server.registerResource(
  "building-rules",
  "building-rules://all",
  {
    description: "Resource for building rules",
    mimeType: "text/plain",
  },
  async (uri) => {
    const uriString = uri.toString();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rules = await fs.readFile(
      path.resolve(__dirname, "../src/data/building-rules.doc"),
      "utf-8",
    );

    return {
      contents: [
        {
          uri: uriString,
          mimeType: "text/plain",
          text: rules,
        },
      ],
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
