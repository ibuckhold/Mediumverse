'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      {
        userId: 1,
        title: 'Is being rich a super power?',
        text: "First, a key fact about Batman: He doesn’t have any superpowers. Not really. He can’t read minds like X-Men’s Charles Xavier, isn’t a hulk (like the Hulk), possesses none of Spiderman’s various spider skills and doesn’t have Superman’s X-ray vision or the ability to leap tall buildings in a single bound. He is, in all ways, resoundingly average. He’s really rich, though. That, it turns out, is superpower enough.\n\nAfter all, who needs to leap tall buildings in a single bound when you can just buy a Batmobile? Who needs superhuman strength when you can pay for the best martial arts instruction in the world? Who needs invisibility when you’ve built yourself a Batcave? Batman’s incredible wealth allows him to bend the world to his will, and it’s therefore the one necessary attribute of the character.\n\nSo how rich, exactly, does a person need to be for it to qualify as a superpower? Surely, richer than anyone in the real world is—surely, since no superheroes walk among us.\n\nAccording to a 2015 article in Money Magazine, Batman’s estimated net worth was $9.2 billion dollars, adjusted for inflation.Under Forbes ranking for that year, that tied him with retailer John Menard Jr.as the 49th richest person in the United States and, according to Forbes Magazine, approximately the 137th richest person on earth.Batman is so wealthy that he can make anything happen—so wealthy it not only makes him super-powerful but also qualifies him to have superpowers—and there are 48 Americans richer than he is.Some of them much richer: Jeff Bezos, the wealthiest person in the world today, has a net worth of $121 billion—over 12 times that of Batman.\n\nWhat can this teach us about the super-rich and, more broadly, about our current economic climate?\n\nOne could argue that unlike Batman, the world’s billionaires aren’t using their superpowers for good, but that would be disingenuous.Look at the Gates Foundation’s efforts to combat malaria, or simply visit The Giving Pledge’s website: There, you can see the names of 175 billionaires who’ve pledged to give 99 percent of their fortunes to charitable causes.\n\nWhat’s interesting, however, isn’t how the Americans richer than Batman use their money, but simply that 48 of them — likely more in 2018 — are richer than he is.Of course, Batman is fiction.It is the story of someone so fabulously wealthy that he can do just about anything he likes.The creators of the character were limited by only their imaginations.Yet they gave Batman a fortune worth $9.8 billion in today’s dollars.He wouldn’t even be the wealthiest person in New York—the city on which Batman’s hometown, Gotham, is based.Mike Bloomberg could buy Batman more than twice over.\n\nThe wealth comparisons, though, don’t truly tell us anything about superheroes.They tell us, instead, about income inequality in our nation — and in the world.In 2016, 40.6 million people in the United States were living in poverty, according to the most recent U.S.Census figures, and median household income was $59,000.The new tax plan will see those earning that median income get an average tax cut of less than $900, while those earning over $732,800 will see a cut of more than $51, 000.\n\nOurs is a nation in which wealth has become so concentrated in the hands of so few that just 48 people in America have superhero money.\n\nWe live in an era in which the super-rich are so rich that reality has outstripped the imagination of comic book writers, bringing us to a time when 40 percent of our nation’s wealth is in the hands of just 1 percent of the population.",
        categoryId: 4,
        imageURL: '/images/7cbec2ed1aaafc36f7d7e846c2561905.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {});

  }
};
