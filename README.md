# How to reproduce

works:

```bash
node --experimental-transform-types server.ts
curl -v -F filename=@README.md http://127.0.0.1:8081/test
```

```bash
npm run start --workspace file
curl -v -F filename=@README.md http://127.0.0.1:8081/files/test
```

broken:

```bash
npm run start
curl -v -F filename=@README.md http://127.0.0.1:8081/api/v1/file/files/test
```
