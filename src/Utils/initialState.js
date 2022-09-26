import localService from '@services/local.service'

const LOADING_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
const LOADING_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg'
const localData = localService.getUserInfo()
export const initialStateMovieManagement = [
  {
    id: '0',
    title: 'Loading...',
    trailer: 'https://www.youtube.com/watch?v=1TvhM6Neosk',
    image: LOADING_IMAGE_URL,
    movieSource: [
      {
        detailSource: 'FULL',
        id: 1,
        movieId: 1,
        source: 'https://www.youtube.com/watch?v=rzc1PRN6y_g',
      },
    ],
    price: 20,
    director: 'Loading...',
    description: 'Loading...',
    actor: [
      {
        name: 'Loading...',
        image: LOADING_AVATAR_URL,
        id: 3,
      },
    ],
    category: [
      {
        categoryName: 'Loading',
        id: 2,
      },
    ],
    status: 'Loading',
    releaseDate: '0',
    key: 1,
  },
]

export const initialStateActorManagement = [
  {
    id: '0',
    name: 'Loading',
    image: LOADING_AVATAR_URL,
    birthday: '0',
    genderId: 1,
    key: 1,
  },
]

export const initialStateUserManagement = [
  {
    id: '0',
    username: 'Loading...',
    fullName: 'Loading...',
    birthday: '0',
    avatar: LOADING_AVATAR_URL,
    email: 'Loading...',
    phoneNumber: 'Loading...',
    roleName: 'Loading',
    genderId: 1,
    key: 1,
  },
]

export const initialStateGeneralProfile = {
  avatar: localData.avatar,
  username: 'Loading...',
  fullName: 'Loading...',
  email: 'Loading...',
  phoneNumber: 'Loading...',
  birthday: '0',
  genderId: 1,
  balance: 'Loading...',
  purchasedMovie: [
    {
      id: 'Loading...',
      title: 'Loading...',
      image: LOADING_IMAGE_URL,
    },
  ],
}
