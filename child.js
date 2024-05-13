let nextId = 1000;

const interval = setInterval(() => {
    const object = {
        id: nextId++,
        timestamp: new Date().toISOString(),
        data: "Added new object"
    };

    process.send({ type: 'new_object', data: object });
}, 10000);

process.on('SIGTERM', () => {
    clearInterval(interval);
    process.exit(0);
});
