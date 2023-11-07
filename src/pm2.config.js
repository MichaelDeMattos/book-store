module.exports = {
    apps: [
      {
        name: "book-store",
        script: "app.js",
        instances: 1,
        exec_mode: "fork",
        watch: false,
        max_memory_restart: "516M",
        env: {
          NODE_ENV: "production",
          PORT: process.env.INSTANCE_PORT,
        },
        log_date_format: "YYYY-MM-DD HH:mm Z",
        error_file: "logs/error.log",
        out_file: "logs/output.log",
        merge_logs: true,
      },
    ],
  };
