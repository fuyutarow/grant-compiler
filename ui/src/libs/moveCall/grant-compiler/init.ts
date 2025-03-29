import * as hackathon from './hackathon/structs';
import * as project from './project/structs';
import { StructClassLoader } from '../_framework/loader';

export function registerClasses(loader: StructClassLoader) {
  loader.register(hackathon.AdminCap);
  loader.register(hackathon.Hackathon);
  loader.register(hackathon.ReviewerPool);
  loader.register(hackathon.ScoreBoard);
  loader.register(project.Project);
}
