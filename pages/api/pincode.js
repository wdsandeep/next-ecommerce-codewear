// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    110089: ["Nort West Delhi", "New Delhi"],
    110087: ["Nort West Delhi", "New Delhi"],
    110088: ["Nort West Delhi", "New Delhi"],
    110086: ["Nort West Delhi", "New Delhi"],
    721302: ["NoKharagpur", "West Bengal"],
    560017: ["Bangalore", "Karnataka"],
  };

  res.status(200).json(pincodes);
}
