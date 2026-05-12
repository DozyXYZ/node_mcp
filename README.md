# Node MCP Server

A beginner project to learn how to set up a Model Context Protocol (MCP) server in Node.js, register tools, resources, and prompts, and connect your server to Claude Desktop.

## Features

- **Register tools** (e.g., add numbers, fetch GitHub repos)
- **Register resources** (e.g., building rules)
- **Register prompts** (e.g., explain SQL queries)
- **Easy integration with Claude Desktop**

---

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/DozyXYZ/node_mcp.git
cd node_mcp
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3.1. Run the MCP Server Inspector

```bash
npx @modelcontextprotocol/inspector
```

Inside the browser Inspector:

```bash
Command: node
Arguments: build/index.js
```

- Click Connect
- You can check that the tools, resources, and prompt are registered correctly.

### 3.2. Run the built server with copilot:

- In .vscode/mcp.json
- Modified the `args` to your absolute path
- After that Copilot can use the registered tools, resources, and prompts

```bash
{
  "servers": {
    "node-mcp": {
      "command": "node",
      "args": [
        "C:\\PATH\\TO\\PARENT\\FOLDER\\projects\\node_mcp\\build\\index.js"
      ]
    }
  }
}
```

### 3.3. Add this MCP Server to Claude Desktop

1. **Open Claude Desktop.**
2. Look at bottom left select **UserName > Settings > Developer > Edit Config > claude_desktop_config.json**.
3. Add and modify the `args`

```bash
  "mcpServers": {
    "node_mcp": {
      "command": "node",
      "args": ["C:\\PATH\\TO\\PARENT\\FOLDER\\projects\\node_mcp\\build\\index.js"]
    }
  }
```

4. Restart Claude Desktop everytime you add new features and run `npm run build`
5. Claude Desktop will now be able to use your custom tools, resources, and prompts

---

### 4. Test the registered Tools, Resources, and Prompts

- **Tools**: Functions you expose to the MCP client (e.g., add-numbers, get_github_repos).

```
Ask the agent: what is 10 + 10? -> It will select tool add-numbers
Ask the agent: Get me all the github repos of user DozyXYZ -> It will select get_github_repos
```

- **Resources**: Data or files the server can provide (e.g., building rules from `src/data/building-rules.doc`).

- In the Chat Input, **click "+" > Connectors > Add from node_mcp > Building-rules**

```
What are the smoking rules?
What are the pets and parking rules?
etc.
```

- **Prompts**: Custom prompt templates for LLMs (e.g., explain-sql).

- In the Chat Input, **click "+" > Connectors > Add from node_mcp > Explain-sql**

```
Copy your SQL to "Enter prompt input" pop-up. Example:

WITH toronto_ppl AS (
  SELECT DISTINCT name
  FROM population
  WHERE country = 'Canada' AND city = 'Toronto'
),
avg_female_salary AS (
  SELECT AVG(salary) AS avgSalary
  FROM salaries
  WHERE gender = 'Female'
)
SELECT name, salary
FROM People
WHERE name IN (SELECT name FROM toronto_ppl)
AND salary >= (SELECT avgSalary FROM avg_female_salary);
```

See `src/index.ts` for examples of how each is registered.

---

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Claude Desktop](https://claude.com/download)

---
