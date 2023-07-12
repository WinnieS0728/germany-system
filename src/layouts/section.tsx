interface propsType {
  children: JSX.Element;
}

export const Section = ({ children }: propsType) => {
    return (
        <section className="mb-4">
            {children}
        </section>
    )
};
