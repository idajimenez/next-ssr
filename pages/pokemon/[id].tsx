/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Details.module.css'
import Link from 'next/link'
import { IPokemon } from '../../types/Pokemon'

export const getServerSideProps = async ({ params: { id } }: { params: { id: string }}) => {
    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);

    return {
        props: {
            pokemon: await resp.json()
        }
    }
}

export default function Details({ pokemon }: { pokemon: IPokemon }) {
    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>

            <div>
                <Link href='/'>
                    Back to Home
                </Link>

                <div className={styles.layout}>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name} />
                    <div>
                        <div className={styles.name}>{pokemon.name}</div>
                        <div className={styles.type}>{pokemon.type?.join(", ")}</div>
                        <table>
                            <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pokemon.stats?.map(({ name, value }) => (
                                <tr key={name}>
                                <td className={styles.attribute}>{name}</td>
                                <td>{value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
