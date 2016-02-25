System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: {'app': {defaultExtension: 'ts'}}
});
System.import('app/main').then(null, console.error.bind(console));