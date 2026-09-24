import DataLoader from 'dataloader';

export abstract class BaseLoader<T, K = string> {
  private readonly loaders = new WeakMap<object, DataLoader<K, T>>();

  protected abstract batch(
    keys: ReadonlyArray<K>,
  ): ReturnType<DataLoader.BatchLoadFn<K, T>>;

  load(ctx: object, id: K) {
    let loader = this.loaders.get(ctx);

    if (!loader) {
      loader = new DataLoader<K, T>((keys) => this.batch(keys));
      this.loaders.set(ctx, loader);
    }

    return loader.load(id);
  }
}
