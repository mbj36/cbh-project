import crypto from 'crypto';

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = 0;
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let candidate;

  if (event && event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash('sha3-512').update(data).digest('hex');
  }

  if (candidate) {
    if (typeof candidate !== 'string') {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }
  return candidate;
};

export { deterministicPartitionKey };
