# Price Drop H5

## Deployment

### Setup
  
  - Add bitbucket git remote
  
        git remote add staging https://heyh@bitbucket.org/xberts/web.git
        git remote add prod https://heyh@bitbucket.org/xberts/web.git
        
### Update staging server
  - Push update
  
        git push prod master:master
        
### Update production server
  - Run 
        
## Build

Run `npm start` for building and `ng serve` for preview.

## Testing

Running `ng test` will run the unit tests with karma.
