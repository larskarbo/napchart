# Napchart

Napchart is a web app that makes it easy to plan complex 24 hour time schedules

Commonly used by people experimenting with polyphasic sleep, but can be used for any purpose

## API

From `server.js`:

```javascript
app.post('/api/create', api.create)
app.get('/api/get', api.get)
app.get('/api/getImage', api.getImage)
```

**Create chart:** `/api/create` with data as post

**Get chart:** `/api/get?chartid=xxxxx` receive data

**Get image:** `/api/getImage?chartid=xxxxx&width=600&height=600&shape=circle` receive image (shape is optional)
