function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}
//reduce
function getBooksBorrowedCount(books) {
  return books.reduce((previousValue, currentBook) => {
    return previousValue + currentBook.borrows.filter(borrow => borrow.returned === false).length
  }, 0);
}
//map
function getMostCommonGenres(books) {
  let map = {};
  books.forEach((num) => {
    if (map[num.genre]) {
      map[num.genre]++;
    } else {
      map[num.genre] = 1;
    }
  });
  return Object.entries(map)
  .map(([name, count]) => {
    return {
      name,
      count
    };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}
// map & sort
function getMostPopularBooks(books) {
  return books
  .map((book) => {
    return { name: book.title, count: book.borrows.length };
  })
  .sort((a, b) => (a.count < b.count ? 1 : -1))
  .slice(0, 5);
}
//helper function
function getAuthorWithBorrowCount(books, authors) {
  return books.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length
    }
  });
}

function getMostPopularAuthors(books, authors) {
const authorsWithBorrowCount = getAuthorWithBorrowCount(books, authors);

const result = [];
  authorsWithBorrowCount.forEach(obj => {
    const existAuthorBook = result.find((k) => k.name === obj.name);
    if(existAuthorBook) {
      existAuthorBook.count += obj.count;
    } else {
      result.push(obj);
    }
  });
  result.sort((a, b) => b.count - a.count);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
