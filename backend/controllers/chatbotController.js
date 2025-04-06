import PG from "../models/PG.js";

export const handleChatQuery = async (req, res) => {
  const { message } = req.body;

  try {
    // Keyword-based extraction
    const cityMatch = message.match(/near (\w+)/i);
    const budgetMatch = message.match(/under ?₹?(\d+)/i);
    const typeMatch = message.match(/(boys|girls|co-ed)/i);

    console.log(cityMatch);

    const filters = { available: true };
    if (cityMatch) filters.city = new RegExp(cityMatch[1], "i");
    if (budgetMatch) filters.price = { $lte: parseInt(budgetMatch[1]) };
    if (typeMatch) filters.type = new RegExp(typeMatch[1], "i");

    const pgs = await PG.find(filters).limit(5);

    if (pgs.length === 0) {
      return res.json({ replies: ["Sorry, no PGs matched your search 😕"] });
    }

    const replies = pgs.map(
      (pg) =>
        `🏠 *${pg.name}* - ₹${pg.price}/mo\n📍 ${pg.address}, ${pg.city}\n👤 Type: ${pg.type}`
    );

    res.json({ replies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ replies: ["Oops! Something went wrong 😓"] });
  }
};
