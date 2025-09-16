export interface TriviaQuestion {
  id: string;
  question: string;
  category: string;
  difficulty?: "easy" | "medium" | "hard";
}

export const categories = [
  { id: "couples", name: "Couples", emoji: "💕", color: "primary" },
  { id: "friends", name: "Friends", emoji: "👫", color: "secondary" },
  { id: "family", name: "Family", emoji: "👨‍👩‍👧‍👦", color: "accent" },
  { id: "fun", name: "Just for Fun", emoji: "🎉", color: "success" },
  { id: "deep", name: "Deep Talk", emoji: "💭", color: "primary" },
  { id: "memories", name: "Memories", emoji: "📸", color: "secondary" },
] as const;

export const triviaQuestions: TriviaQuestion[] = [
  // Couples Questions
  {
    id: "1",
    question: "What was your first impression of your partner?",
    category: "couples",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "What is your partner's biggest fear?",
    category: "couples",
    difficulty: "medium",
  },
  {
    id: "3",
    question:
      "If you could change one thing about your relationship, what would it be?",
    category: "couples",
    difficulty: "hard",
  },
  {
    id: "4",
    question: "What does your partner do that makes you feel most loved?",
    category: "couples",
    difficulty: "medium",
  },
  {
    id: "5",
    question: "What song reminds you of your partner?",
    category: "couples",
    difficulty: "easy",
  },

  // Friends Questions
  {
    id: "6",
    question:
      "What's the most embarrassing thing that happened to you in school?",
    category: "friends",
    difficulty: "easy",
  },
  {
    id: "7",
    question: "If you could have any superpower, what would it be and why?",
    category: "friends",
    difficulty: "easy",
  },
  {
    id: "8",
    question: "What's your most unpopular opinion?",
    category: "friends",
    difficulty: "medium",
  },
  {
    id: "9",
    question:
      "Which friend in our group would survive the longest in a zombie apocalypse?",
    category: "friends",
    difficulty: "easy",
  },
  {
    id: "10",
    question:
      "What's a secret talent you have that most people don't know about?",
    category: "friends",
    difficulty: "medium",
  },

  // Family Questions
  {
    id: "11",
    question: "What family tradition means the most to you?",
    category: "family",
    difficulty: "easy",
  },
  {
    id: "12",
    question: "Which parent do you think you're more similar to and why?",
    category: "family",
    difficulty: "medium",
  },
  {
    id: "13",
    question: "What's your favorite childhood memory with the family?",
    category: "family",
    difficulty: "easy",
  },
  {
    id: "14",
    question:
      "If you could ask your grandparents one question, what would it be?",
    category: "family",
    difficulty: "medium",
  },
  {
    id: "15",
    question: "What's the best advice a family member has given you?",
    category: "family",
    difficulty: "easy",
  },

  // Just for Fun Questions
  {
    id: "16",
    question: "If you were a pizza topping, what would you be?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "17",
    question: "What's the weirdest food combination you actually enjoy?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "18",
    question: "If animals could talk, which species would be the rudest?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "19",
    question: "What's your go-to dance move?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "20",
    question:
      "If you could only eat one color of food for the rest of your life, what color would you choose?",
    category: "fun",
    difficulty: "easy",
  },

  // Deep Talk Questions
  {
    id: "21",
    question: "What does success mean to you?",
    category: "deep",
    difficulty: "medium",
  },
  {
    id: "22",
    question:
      "If you could know the absolute truth to one question, what would you ask?",
    category: "deep",
    difficulty: "hard",
  },
  {
    id: "23",
    question:
      "What's something you've learned recently that changed your perspective?",
    category: "deep",
    difficulty: "medium",
  },
  {
    id: "24",
    question: "What do you think is your purpose in life?",
    category: "deep",
    difficulty: "hard",
  },
  {
    id: "25",
    question: "What would you do if you knew you couldn't fail?",
    category: "deep",
    difficulty: "medium",
  },

  // Memories Questions
  {
    id: "26",
    question: "What's your earliest childhood memory?",
    category: "memories",
    difficulty: "easy",
  },
  {
    id: "27",
    question: "Describe a time when you laughed until your stomach hurt",
    category: "memories",
    difficulty: "easy",
  },
  {
    id: "28",
    question: "What's a moment that made you realize you were growing up?",
    category: "memories",
    difficulty: "medium",
  },
  {
    id: "29",
    question: "What's the best trip or vacation you've ever taken?",
    category: "memories",
    difficulty: "easy",
  },
  {
    id: "30",
    question: "Tell us about a time when you overcame something difficult",
    category: "memories",
    difficulty: "medium",
  },
];

export const getCategoryById = (id: string) => {
  return categories.find((category) => category.id === id);
};

export const getQuestionsByCategories = (categoryIds: string[]) => {
  if (categoryIds.includes("all")) {
    return triviaQuestions;
  }
  return triviaQuestions.filter((question) =>
    categoryIds.includes(question.category)
  );
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
