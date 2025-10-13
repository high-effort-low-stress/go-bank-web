import { NumberTicker } from "./ui/number-ticker";

interface StatsProps {
  label: string;
  value: number;

  startValuePercentage?: number;
}

interface StatsGroupProps {
  stats: StatsProps[];
}

export const Stats = ({ stats }: StatsGroupProps) => {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl">
                  {
                    <NumberTicker
                      value={stat.value}
                      startValue={stat.value * (stat.startValuePercentage || 1)}
                    />
                  }
                </div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
