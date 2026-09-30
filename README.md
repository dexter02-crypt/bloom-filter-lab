# Bloom Filter Lab

A browser-based experiment for understanding probabilistic membership filters.

## Guarantees demonstrated

For a correctly constructed Bloom filter:

- a negative result means the item is definitely not represented by the filter;
- a positive result means the item may be represented;
- false positives are possible;
- false negatives are not expected for values inserted into an unchanged filter.

The app compares a deterministic measured false-positive rate against the standard approximation:

`(1 - exp(-k n / m))^k`

where `m` is the number of bits, `k` is the number of positions per value, and `n` is the number of inserted values.

## Run

```bash
python3 serve.py
```

## Test

```bash
npm test
```

This is an educational implementation, not a security primitive.

## License

MIT. Maintainer: Shikhar Singh.
