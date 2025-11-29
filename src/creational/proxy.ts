// subject.ts
interface DataFetcher {
  fetchData(key: string): Promise<string>;
}

class ApiDataFetcher implements DataFetcher {
  async fetchData(key: string): Promise<string> {
    // Simulate network delay or heavy computation
    await new Promise((r) => setTimeout(r, 2000));
    console.log("ApiDataFetcher: fetched", key);
    return `value-for-${key}`;
  }
}

class CachingProxy implements DataFetcher {
  private cache = new Map<string, string>();
  private readonly realFetcher: DataFetcher;

  constructor(realFetcher: DataFetcher) {
    this.realFetcher = realFetcher;
  }

  async fetchData(key: string): Promise<string> {
    if (this.cache.has(key)) {
      console.log("CachingProxy: cache hit", key);
      return this.cache.get(key)!;
    }
    console.log("CachingProxy: cache miss", key);
    const result = await this.realFetcher.fetchData(key);
    this.cache.set(key, result);
    return result;
  }

  // optional: expose cache for tests/inspection
  getCacheSize(): number {
    return this.cache.size;
  }
}

async function run() {
  const api = new ApiDataFetcher();
  const cached = new CachingProxy(api);

  console.log(await cached.fetchData("users"));
  console.log(await cached.fetchData("users")); // cache hit -> fast
  console.log("cache size:", cached.getCacheSize());
}

run().catch(console.error);
