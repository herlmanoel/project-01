export const loadPosts = async () => {
  // retorna uma promise que retorna uma resposta e, após isso, convertemos
  const postsResponse = fetch(`https://jsonplaceholder.typicode.com/posts`);
  const photosResponse = fetch(`https://jsonplaceholder.typicode.com/photos`);

  /*  
      não colocamos o await, pois temos que fazer a requisição das Fotos
      e, para fazer em paralelo, usamos o Promise.all([ ]);
    */

  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsJson = await posts.json();
  const photosJson = await photos.json();

  // unindo os arrays pelo menor
  const postsAndPhotos = postsJson.map((post, index) => {
    // o cover vem da foto
    return { ...post, cover: photosJson[index].url };
  });

  return postsAndPhotos;
};
