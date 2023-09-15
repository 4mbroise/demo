import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    console.log('HEADER :', request.headers);
    console.log();
    console.log('PARAMS :', request.params);
    console.log();
    console.log('PATH :', request.path);
    console.log();
    console.log('METHOD :', request.method);

    if (!request.headers['api-key']) {
      throw new ForbiddenException('Api Key required');
    }

    const key = request.headers['api-key'] as string;
    const apiKey = await this.apiKeyService.findOne(key);

    if (apiKey.isAdmin) {
      return true;
    }

    // Protection des endpoints qui avec un paramètre cursusName
    if (!!request.params['cursusName']) {
      if (apiKey.isResponsible) {
        const responsible = apiKey.cursusResponsible;
        if (!!responsible) {
          if (responsible.cursus.cursusResponsibles.contains(responsible)) {
            return true;
          } else {
            throw new UnauthorizedException(
              "Vous n'avez pas les droits nécessaire pour accéder au cursus '" +
                request.params['cursusName'] +
                "'",
            );
          }
        }
      }
    }

    // Protection des endpoints students avec un id
    // (un étudiant peut accéder en lecture (GET) à son endpoint mais pas les autres ne peuvent pas y accéder)
    if (request.path.startsWith('/students')) {
      if (apiKey.isStudent) {
        const student = apiKey.student;
        if (!!student) {
          if (request.method === 'GET') {
            if (!!request.params['id']) {
              if (student.userID === request.params['id']) {
                return true;
              } else {
                throw new UnauthorizedException(
                  student.userID +
                    ' ne peut pas accéder aux données de ' +
                    request.params['id'],
                );
              }
            } else {
              throw new UnauthorizedException(
                "Accès à l'endpoint " + request.path + ' interdit',
              );
            }
          } else {
            throw new UnauthorizedException(
              'Méthode HTTP ' + request.method + ' interdite',
            );
          }
        }
      } else {
        throw new UnauthorizedException("Vous n'êtes pas étudiant");
      }
    }

    return false;
  }
}
