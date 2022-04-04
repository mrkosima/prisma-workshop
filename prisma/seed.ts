import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


// from https://www.mockaroo.com/
const userData: Prisma.AuthorCreateInput[] = [
  {
    "email": "hsorsbie0@hc360.com",
    "name": "Hurley Sorsbie",
    "posts": {
      "create": [
        {
          "title": "architect magnetic technologies",
          "content": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
        },
        {
          "title": "drive interactive mindshare",
          "content": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
        }
      ]
    }
  }, {
    "email": "bshackel1@archive.org",
    "name": "Brianne Shackel",
    "posts": {
      "create": [
        {
          "title": "optimize holistic mindshare",
          "content": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
        },
        {
          "title": "transition seamless e-markets",
          "content": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
        }
      ]
    }
  }, {
    "email": "amccraw2@w3.org",
    "name": "Alberta McCraw",
    "posts": {
      "create": [
        {
          "title": "strategize wireless partnerships",
          "content": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
        }
      ]
    }
  }, {
    "email": "rmatus3@google.com.au",
    "name": "Reeva Matus",
    "posts": {
      "create": [
        {
          "title": "generate e-business synergies",
          "content": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."
        },
        {
          "title": "expedite holistic vortals",
          "content": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
        },
        {
          "title": "implement B2B e-business",
          "content": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
        }
      ]
    }
  }, {
    "email": "bfellona4@bbb.org",
    "name": "Barbi Fellona",
    "posts": {
      "create": [
        {
          "title": "empower robust mindshare",
          "content": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."
        },
        {
          "title": "unleash killer architectures",
          "content": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
        },
        {
          "title": "innovate cutting-edge web-readiness",
          "content": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."
        }
      ]
    }
  }, {
    "email": "bgreendale5@hao123.com",
    "name": "Bron Greendale",
    "posts": {
      "create": [
        {
          "title": "exploit B2C platforms",
          "content": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
        }
      ]
    }
  }, {
    "email": "hauchinleck6@sphinn.com",
    "name": "Henry Auchinleck",
    "posts": {
      "create": [
        {
          "title": "engineer vertical experiences",
          "content": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
        }
      ]
    }
  }, {
    "email": "ffyldes7@a8.net",
    "name": "Frank Fyldes",
    "posts": {
      "create": [
        {
          "title": "redefine transparent e-markets",
          "content": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
        },
        {
          "title": "e-enable 24/7 platforms",
          "content": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
        }
      ]
    }
  }, {
    "email": "ahubbins8@springer.com",
    "name": "Andriette Hubbins",
    "posts": {
      "create": [
        {
          "title": "deliver value-added ROI",
          "content": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
        },
        {
          "title": "leverage compelling deliverables",
          "content": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
        }
      ]
    }
  }, {
    "email": "rwooland9@cloudflare.com",
    "name": "Ruy Wooland",
    "posts": {
      "create": [
        {
          "title": "architect visionary users",
          "content": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        }
      ]
    }
  }]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.author.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })