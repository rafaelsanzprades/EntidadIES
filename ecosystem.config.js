module.exports = {
  apps: [
    {
      name: "entidadies-backend",
      cwd: "c:\\GD-rsp\\APP-EntidadIES\\backend",
      script: ".venv313\\Scripts\\python.exe",
      args: "-m uvicorn main:app --reload --port 8000",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "production",
      }
    },
    {
      name: "entidadies-frontend",
      cwd: "c:\\GD-rsp\\APP-EntidadIES\\frontend",
      script: "node_modules\\next\\dist\\bin\\next",
      args: "dev",
      watch: false,
      env: {
        NODE_ENV: "development",
      }
    }
  ]
};
