import { useMemo, useState } from "react";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { score, labelFromScore } from "@/lib/sentiment";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RTooltip,
} from "recharts";

interface Result { text: string; value: number; label: "positive" | "neutral" | "negative" }

const sampleTweets = `Love this stock! Huge profit today 📈\nThis is awful, losing money again...\nNeutral day so far.\nAmazing earnings report!\nTerrible guidance, very disappointed.`;

const SentimentAnalysis = () => {
  const [input, setInput] = useState(sampleTweets);

  const results = useMemo<Result[]>(() => {
    return input
      .split(/\r?\n/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => {
        const s = score(t);
        return { text: t, value: s, label: labelFromScore(s) };
      });
  }, [input]);

  const summary = useMemo(() => {
    const counts = { positive: 0, neutral: 0, negative: 0 } as Record<
      Result["label"],
      number
    >;
    results.forEach((r) => counts[r.label]++);
    return counts;
  }, [results]);

  const pieData = [
    { name: "Positive", value: summary.positive, fill: "hsl(var(--brand))" },
    { name: "Neutral", value: summary.neutral, fill: "hsl(var(--muted-foreground))" },
    { name: "Negative", value: summary.negative, fill: "hsl(var(--destructive))" },
  ];

  return (
    <>
      <Seo
        title="Tweet Sentiment Analyzer — Lexicon-Based"
        description="Classify tweets as positive, neutral, or negative using a lightweight lexicon and visualize the distribution."
      />
      <main className="min-h-screen bg-background">
        <header className="container mx-auto px-6 pt-10 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold">Tweet Sentiment Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Paste tweets (one per line). This demo uses a simple lexicon for fast, private, in-browser analysis.
          </p>
        </header>

        <section className="container mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea rows={10} value={input} onChange={(e) => setInput(e.target.value)} />
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setInput(sampleTweets)}>Load sample</Button>
                <Button variant="ghost" onClick={() => setInput("")}>Clear</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <div>Positive: {summary.positive}</div>
                <div>Neutral: {summary.neutral}</div>
                <div>Negative: {summary.negative}</div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-6 pb-12">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.length === 0 && (
                <p className="text-muted-foreground">No tweets to analyze.</p>
              )}
              {results.map((r, i) => (
                <div key={i} className="flex items-start justify-between gap-4 border-b py-2 last:border-b-0">
                  <p className="flex-1">{r.text}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.label === "positive" ? "default" : r.label === "neutral" ? "secondary" : "destructive"}>
                      {r.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">score {r.value}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default SentimentAnalysis;
