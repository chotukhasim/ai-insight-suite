import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import InteractiveSpotlight from "@/components/InteractiveSpotlight";
import { ArrowRight, LineChart, MessageSquareText } from "lucide-react";

const Index = () => {
  return (
    <>
      <Seo
        title="AI Mini-Lab — Stock Predictor & Sentiment Analyzer"
        description="Try a linear-regression stock price predictor and a lexicon-based tweet sentiment analyzer. Learn, explore, and visualize quickly."
      />
      <main className="relative min-h-screen bg-background">
        <InteractiveSpotlight />
        <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-12 text-center">
          <header>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              AI Mini-Lab
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore two interactive demos: a Stock Price Predictor using linear
              regression and a Tweet Sentiment Analyzer using a lightweight
              lexicon.
            </p>
          </header>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild variant="hero" size="lg">
              <Link to="/stock-predictor">
                <LineChart className="mr-1" /> Stock Price Predictor
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sentiment-analysis">
                <MessageSquareText className="mr-1" /> Sentiment Analyzer
              </Link>
            </Button>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 grid md:grid-cols-2 gap-6">
          <article className="rounded-xl border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-semibold mb-2">Stock Price Predictor</h2>
            <p className="text-muted-foreground mb-4">
              Upload CSV or use sample data, fit a linear regression, forecast
              the next days, and visualize results.
            </p>
            <Button asChild variant="link">
              <Link to="/stock-predictor" className="inline-flex items-center">
                Explore <ArrowRight className="ml-1" />
              </Link>
            </Button>
          </article>
          <article className="rounded-xl border bg-card p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-semibold mb-2">Tweet Sentiment Analyzer</h2>
            <p className="text-muted-foreground mb-4">
              Paste tweets (one per line), classify as positive, neutral, or
              negative, and view distribution.
            </p>
            <Button asChild variant="link">
              <Link to="/sentiment-analysis" className="inline-flex items-center">
                Explore <ArrowRight className="ml-1" />
              </Link>
            </Button>
          </article>
        </section>
      </main>
    </>
  );
};

export default Index;
