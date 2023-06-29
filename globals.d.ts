interface Component {
  mount: (selector: string) => void
}

interface Window {
  unipaas: {
    components: (accessToken: string, options: any) => {
      create: (componentName: string, options: any) => Component
    }
  }
}
