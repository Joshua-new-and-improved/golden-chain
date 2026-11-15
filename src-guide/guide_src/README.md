Plain-English chapter guides ("In plain words" box above each chapter in the Bible reader; code in 68_guide.js, built by tools/guide.py).
Format: one line per chapter:  slug N|Title|What happens, in plain words (2-3 short sentences)|Why it matters (1-2 sentences)
Rules: today's English, modern names (Noah, not Noe), no pipes or em dashes inside text, Catholic reading, about 50-70 words per chapter.
Chapter numbering follows the Douay-Rheims text in bible/ (Vulgate psalm numbers, Esther 10-16 and Daniel 3, 13, 14 include the Greek parts, Joel has 3 chapters, Malachi 4, Baruch 6).
John 1-6 is skipped (it has full study units). Run `python3 tools/guide.py` to see which chapters are still missing.
