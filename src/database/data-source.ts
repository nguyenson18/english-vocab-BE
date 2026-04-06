import { DataSource, DataSourceOptions } from 'typeorm';
import { Topic } from '../modules/topics/entities/topic.entity';
import { Vocabulary } from '../modules/vocabularies/entities/vocabulary.entity';
import { QuizAttempt } from '../modules/quiz/entities/quiz-attempt.entity';
import { QuizAttemptDetail } from '../modules/quiz/entities/quiz-attempt-detail.entity';
import { UserVocabularyProgress } from '../modules/progress/entities/user-vocabulary-progress.entity';
import * as fs from 'node:fs';
import * as path from 'node:path';

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) continue;

    const equalIndex = line.indexOf('=');
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = line.slice(equalIndex + 1).trim().replace(/^['\"]|['\"]$/g, '');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const databaseUrl = process.env.DATABASE_URL?.trim();
const dbSsl = process.env.DB_SSL === 'true';

const commonOptions: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: [Topic, Vocabulary, QuizAttempt, QuizAttemptDetail, UserVocabularyProgress],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  ssl: dbSsl ? { rejectUnauthorized: false } : false,
};

const dataSourceOptions: DataSourceOptions = databaseUrl
  ? {
      ...commonOptions,
      url: databaseUrl,
    } as DataSourceOptions
  : {
      ...commonOptions,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    } as DataSourceOptions;

export default new DataSource(dataSourceOptions);
