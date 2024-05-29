import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { MigrationInterface } from '../migration.interface';
import { MigrationService } from '../migration.service';
import { Logger } from '@nestjs/common';

export class OttCollectionMigration implements MigrationInterface {
    private client: MongoClient;
    private readonly url: string = `${process.env.MONGO_DB_HOST}${process.env.MONGO_DB_NAME}`;
    private readonly logger = new Logger(MigrationService.name);

    constructor() {
        this.client = new MongoClient(this.url);
    }

    public async up(): Promise<void> {
        try {
            this.logger.log('OttCollectionMigration : migration started.');
            await this.client.connect();
            const database = this.client.db();

            const usersCollection = database.collection('users');
            const moviesCollection = database.collection('movies');
            const tvShowsCollection = database.collection('tvshows');
            // const myListCollection = database.collection('mylists');

            // Sample data for users collection
            const users = [
                {
                    _id: uuidv4(),
                    username: 'Satish Kumar',
                    preferences: {
                        favoriteGenres: ['Action', 'Comedy'],
                        dislikedGenres: ['Horror'],
                    },
                    watchHistory: [
                        { contentId: 'm1', watchedOn: new Date('2024-01-01'), rating: 4 },
                        { contentId: 't1', watchedOn: new Date('2024-02-01'), rating: 5 },
                    ],
                    email: 'satish.kumar@stage.in',
                },
                {
                    _id: uuidv4(),
                    username: 'Nitish Kumar',
                    preferences: {
                        favoriteGenres: ['Drama', 'SciFi'],
                        dislikedGenres: ['Comedy'],
                    },
                    watchHistory: [
                        { contentId: 'm2', watchedOn: new Date('2024-03-01'), rating: 3 },
                        { contentId: 't2', watchedOn: new Date('2024-04-01'), rating: 4 },
                    ],
                    email: 'nitish.kumar@stage.in',
                },
                {
                    _id: uuidv4(),
                    username: 'Wasim Pathan',
                    preferences: {
                        favoriteGenres: ['Fantasy', 'Romance'],
                        dislikedGenres: ['Drama'],
                    },
                    watchHistory: [
                        { contentId: 'm3', watchedOn: new Date('2024-05-01'), rating: 2 },
                        { contentId: 't3', watchedOn: new Date('2024-06-01'), rating: 5 },
                    ],
                    email: 'wasim.pathan@stage.in',
                },
                {
                    _id: uuidv4(),
                    username: 'Stage User',
                    preferences: {
                        favoriteGenres: ['Horror', 'Action'],
                        dislikedGenres: ['Romance'],
                    },
                    watchHistory: [
                        { contentId: 'm4', watchedOn: new Date('2024-07-01'), rating: 4 },
                        { contentId: 't4', watchedOn: new Date('2024-08-01'), rating: 3 },
                    ],
                    email: 'stage.user@stage.in',
                },
                {
                    _id: uuidv4(),
                    username: 'Deepak Singh',
                    preferences: {
                        favoriteGenres: ['Action', 'Fantasy'],
                        dislikedGenres: ['Horror'],
                    },
                    watchHistory: [
                        { contentId: 'm5', watchedOn: new Date('2024-09-01'), rating: 5 },
                        { contentId: 't5', watchedOn: new Date('2024-10-01'), rating: 4 },
                    ],
                    email: 'deepak.singh@stage.in',
                },
            ];

            // Sample data for movies collection
            const movies = [
                {
                    _id: uuidv4(),
                    title: 'Inception',
                    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
                    genres: ['Action', 'Sci-Fi'],
                    releaseDate: new Date('2010-07-16'),
                    director: 'Christopher Nolan',
                    actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
                },
                {
                    _id: uuidv4(),
                    title: 'Tenet',
                    description: 'Armed with only one word, Tenet, and fighting for the survival of the world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
                    genres: ['Action', 'Sci-Fi'],
                    releaseDate: new Date('2020-08-26'),
                    director: 'Christopher Nolan',
                    actors: ['John David Washington', 'Robert Pattinson'],
                },
                {
                    _id: uuidv4(),
                    title: 'Batman Begins',
                    description: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',
                    genres: ['Action', 'Drama'],
                    releaseDate: new Date('2005-06-15'),
                    director: 'Christopher Nolan',
                    actors: ['Christian Bale', 'Michael Caine'],
                },
                {
                    _id: uuidv4(),
                    title: 'The Dark Knight Rises',
                    description: 'Eight years after the Joker\'s reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.',
                    genres: ['Action', 'Drama'],
                    releaseDate: new Date('2012-07-20'),
                    director: 'Christopher Nolan',
                    actors: ['Christian Bale', 'Tom Hardy'],
                },
                {
                    _id: uuidv4(),
                    title: 'The Revenant',
                    description: 'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.',
                    genres: ['Action', 'Drama'],
                    releaseDate: new Date('2015-12-25'),
                    director: 'Alejandro González Iñárritu',
                    actors: ['Leonardo DiCaprio', 'Tom Hardy'],
                },
                {
                    _id: uuidv4(),
                    title: 'Shutter Island',
                    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
                    genres: ['Mystery', 'Thriller'],
                    releaseDate: new Date('2010-02-19'),
                    director: 'Martin Scorsese',
                    actors: ['Leonardo DiCaprio', 'Emily Mortimer'],
                },
            ];

            // Sample data for tvshows collection
            const tvShows = [
                {
                    _id: uuidv4(),
                    title: 'Breaking Bad',
                    description: 'A high school chemistry teacher turned methamphetamine producer.',
                    genres: ['Crime', 'Drama', 'Thriller'],
                    episodes: [
                        {
                            episodeNumber: 1,
                            seasonNumber: 1,
                            releaseDate: new Date('2008-01-20'),
                            director: 'Vince Gilligan',
                            actors: ['Bryan Cranston', 'Aaron Paul'],
                        },
                        {
                            episodeNumber: 2,
                            seasonNumber: 1,
                            releaseDate: new Date('2008-01-27'),
                            director: 'Adam Bernstein',
                            actors: ['Bryan Cranston', 'Aaron Paul'],
                        },
                        {
                            episodeNumber: 3,
                            seasonNumber: 1,
                            releaseDate: new Date('2008-02-10'),
                            director: 'Jim McKay',
                            actors: ['Bryan Cranston', 'Aaron Paul'],
                        },
                    ],
                },
                {
                    _id: uuidv4(),
                    title: 'Panchayat',
                    description: 'A comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.',
                    genres: ['Comedy', 'Drama'],
                    episodes: [
                        {
                            episodeNumber: 1,
                            seasonNumber: 1,
                            releaseDate: new Date('2020-04-03'),
                            director: 'Deepak Kumar Mishra',
                            actors: ['Jitendra Kumar', 'Raghubir Yadav'],
                        },
                        {
                            episodeNumber: 2,
                            seasonNumber: 1,
                            releaseDate: new Date('2020-04-10'),
                            director: 'Deepak Kumar Mishra',
                            actors: ['Jitendra Kumar', 'Raghubir Yadav'],
                        },
                        {
                            episodeNumber: 3,
                            seasonNumber: 1,
                            releaseDate: new Date('2020-04-17'),
                            director: 'Deepak Kumar Mishra',
                            actors: ['Jitendra Kumar', 'Raghubir Yadav'],
                        },
                    ],
                },
                {
                    _id: uuidv4(),
                    title: 'Young Sheldon',
                    description: 'Meet a child genius named Sheldon Cooper (already seen as an adult in The Big Bang Theory) and his family. Some unique challenges face Sheldon who seems socially impaired.',
                    genres: ['Comedy', 'Drama'],
                    episodes: [
                        {
                            episodeNumber: 1,
                            seasonNumber: 1,
                            releaseDate: new Date('2017-09-25'),
                            director: 'Jon Favreau',
                            actors: ['Iain Armitage', 'Zoe Perry'],
                        },
                        {
                            episodeNumber: 2,
                            seasonNumber: 1,
                            releaseDate: new Date('2017-10-02'),
                            director: 'Jaffar Mahmood',
                            actors: ['Iain Armitage', 'Zoe Perry'],
                        },
                        {
                            episodeNumber: 3,
                            seasonNumber: 1,
                            releaseDate: new Date('2017-10-09'),
                            director: 'Michael Zinberg',
                            actors: ['Iain Armitage', 'Zoe Perry'],
                        },
                        {
                            episodeNumber: 4,
                            seasonNumber: 1,
                            releaseDate: new Date('2017-10-16'),
                            director: 'Alex Reid',
                            actors: ['Iain Armitage', 'Zoe Perry'],
                        },
                        {
                            episodeNumber: 5,
                            seasonNumber: 1,
                            releaseDate: new Date('2017-10-23'),
                            director: 'Howard Deutch',
                            actors: ['Iain Armitage', 'Zoe Perry'],
                        },
                    ],
                },
            ];

            // Insert sample data
            await usersCollection.insertMany(users);
            await moviesCollection.insertMany(movies);
            await tvShowsCollection.insertMany(tvShows);
            // await myListCollection.insertMany([]);

            this.logger.log('OttCollectionMigration : sample data inserted.');
        } catch (error) {
            this.logger.error('OttCollectionMigration : failed to insert sample data.', error);
        } finally {
            await this.client.close();
        }
    }

    public async down(): Promise<void> {
        try {
            await this.client.connect();
            const database = this.client.db();

            await database.collection('users').deleteMany({});
            await database.collection('movies').deleteMany({});
            await database.collection('tvshows').deleteMany({});
            await database.collection('mylists').deleteMany({});

            this.logger.log('SUCCESS | Sample data removed');
        } catch (error) {
            this.logger.log('ERROR | Sample data removed', error);
        } finally {
            await this.client.close();
        }
    }
}
