import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://api.hyuabot.app/api/v2';
export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => ({
  link: httpLink.create({ uri }),
  cache: new InMemoryCache({
    typePolicies: {
      Shuttle: {
        merge: true,
      }
    }
  }),
});

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
