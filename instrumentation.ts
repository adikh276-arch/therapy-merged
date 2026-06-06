import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { registerOTel } from "@vercel/otel";

const SUPERLOG_ENDPOINT = "https://intake.superlog.sh";
const SUPERLOG_PUBLIC_TOKEN = "sl_public_AdLyBc3KXbDfC6PG9kkoZIY3DTXH8aSx1Lwxix_r2MM";

function superlogHeaders(token: string): Record<string, string> {
  return { "x-api-key": token };
}

export function register() {
  registerOTel({
    serviceName: "therapy-merged",
    traceExporter: new OTLPTraceExporter({
      url: `${SUPERLOG_ENDPOINT}/v1/traces`,
      headers: superlogHeaders(SUPERLOG_PUBLIC_TOKEN),
    }),
    metricExporter: new OTLPMetricExporter({
      url: `${SUPERLOG_ENDPOINT}/v1/metrics`,
      headers: superlogHeaders(SUPERLOG_PUBLIC_TOKEN),
    }),
    logRecordProcessors: [
      new BatchLogRecordProcessor(
        new OTLPLogExporter({
          url: `${SUPERLOG_ENDPOINT}/v1/logs`,
          headers: superlogHeaders(SUPERLOG_PUBLIC_TOKEN),
        })
      ),
    ],
  });
}
