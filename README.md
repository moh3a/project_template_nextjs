### basic features

- PWA support
- dark mode
- internationalization
- session management
- web socket
- connected to mongodb

### TODO

- add basic auth workflow
- fix redundant websockets emissions from mongodb.watch
- npm web-push
- npm node-schedule - cron jobs
- window API online -> basic implementation in \_app.tsx

##### next-build page optimization output:

Page - First Load JS

- ┌ ● / - 127 kB
- ├ /\_app - 107 kB
- ├ ○ /\_offline - 107 kB
- ├ ○ /404 - 107 kB
- ├ λ /api/auth/[...nextauth] - 107 kB
- ├ λ /api/socket - 107 kB
- └ λ /api/task - 107 kB
- ==================================
- First Load JS shared by all 107 kB
