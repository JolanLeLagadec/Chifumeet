"use server";
export const findUsersTwoKms = async (userLatitude, userLongitude, idCurrentUser) => {
  const twoKmsInDegrees = 2 / 111;

  if(!idCurrentUser){
    new Error('Utilisateur pas connecté')
  }
  // recherche dans un carré à la place d'un cercle
  // TODO : formule harversine pour plus de précision (prend en compte la courbure de la terre)
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          id: {
            not: idCurrentUser, 
          },
        },
        {
          Location: {
              latitude: {
                gte: userLatitude - twoKmsInDegrees,
                lte: userLatitude + twoKmsInDegrees,
              },
              longitude: {
                gte: userLongitude - twoKmsInDegrees,
                lte: userLongitude + twoKmsInDegrees,
              },
            },
          },
        
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      age: true,
      image: true,
      bio: true,
      note: true,
      interests: true,
      createdAt: true,
      updatedAt: true,
      participation: true,
      Ranking: true,
      // on exclut le mdp
      Location: { 
        select: {
          id: true,
          latitude: true,
          longitude: true,
          createdAt: true,
          updatedAt: true,
          userId: true 
        }
      },
    },
  });
  return users;
};