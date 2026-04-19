import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { dranbPipeline } from "@/lib/inngest/moirai-simple";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [dranbPipeline],
});

