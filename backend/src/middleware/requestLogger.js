export const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusColor = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
        console.log(`\x1b[36m[${req.method}]\x1b[0m ${req.originalUrl} ${statusColor}${status}\x1b[0m - ${duration}ms`);
    });
    next();
};
