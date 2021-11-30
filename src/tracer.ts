import tracer from 'dd-trace';
tracer.init({
    enabled: true,
    service: "cringe-api-stable",
    version: "1.0.0",
    runtimeMetrics: true,
    port: 8126
});

tracer.use('express');
tracer.use('http');
tracer.use('http2');

export default tracer;
