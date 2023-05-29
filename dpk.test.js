import { deterministicPartitionKey } from './dpk';

describe('deterministicPartitionKey', () => {
  it('Returns the literal 0 when given no input', () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(0);
  });

  it('it should return the partition key if key is provided', () => {
    const event = { partitionKey: 'Hello Clipboard Health' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('Hello Clipboard Health');
  });

  it('it should return the stringified partition key if key is provided as integer', () => {
    const event = { partitionKey: 123 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('123');
  });

  it('if partition key is not present in the event, it should generate a hash', () => {
    const event = { id: 123, name: 'Example Event' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(
      '2884b50599fb0a839bca31ebbd9195bf5185434ca3c5ad901ede3c55902a01a60224d8a6a933d846afdf1deb245ea64f1b4b1f9db8f49b6f276d4999d4073e4c'
    );
  });
});
