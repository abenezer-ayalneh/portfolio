'use client'

import { useCallback, useEffect, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type GalleryImage = string | StaticImageData

interface ProjectGalleryProps {
	images: GalleryImage[]
	imageObjectPositions?: string[]
	title: string
	priority?: boolean
}

/** Stable string key for an image whether it's a URL string or a static import. */
const imageKey = (image: GalleryImage) => (typeof image === 'string' ? image : image.src)

const HINT_KEY = 'portfolio:carousel-hint-seen'

/**
 * The swipeable [[gallery]] inside a feature row's framed visual panel: real
 * screenshots with overlaid amber arrows and a dot page indicator. Bounded — the
 * arrows disable at the ends, no auto-advance. A single image renders statically.
 *
 * On the first carousel a visitor encounters (once ever, persisted in
 * localStorage), a peek + pulsing-chevron hint signals that the panel is
 * swipeable; it dismisses on the first interaction. Only one gallery claims the
 * hint per page load — see `hintClaimedThisLoad`.
 */
// Ensures only the first eligible gallery on a given page load shows the hint,
// even before the localStorage flag is written.
let hintClaimedThisLoad = false

export function ProjectGallery({ images, imageObjectPositions, title, priority = false }: ProjectGalleryProps) {
	const total = images.length
	const multiple = total > 1

	const [api, setApi] = useState<CarouselApi>()
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [canScrollPrev, setCanScrollPrev] = useState(false)
	const [canScrollNext, setCanScrollNext] = useState(false)
	const [showHint, setShowHint] = useState(false)

	const dismissHint = useCallback(() => {
		setShowHint(false)
		try {
			window.localStorage.setItem(HINT_KEY, '1')
		} catch {
			// Private mode / storage disabled — the hint simply shows again next visit.
		}
	}, [])

	// Claim the first-visit hint for the first multi-image gallery the visitor sees.
	useEffect(() => {
		if (!multiple || typeof window === 'undefined' || hintClaimedThisLoad) return
		try {
			if (window.localStorage.getItem(HINT_KEY)) return
		} catch {
			return
		}
		hintClaimedThisLoad = true
		// Reading localStorage is a client-only mount check — the effect is the
		// right place for it, so the synchronous setState here is intentional.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setShowHint(true)
	}, [multiple])

	// Sync arrow/dot state from embla; dismiss the hint as soon as the user grabs it.
	useEffect(() => {
		if (!api) return
		const onSelect = () => {
			setSelectedIndex(api.selectedScrollSnap())
			setCanScrollPrev(api.canScrollPrev())
			setCanScrollNext(api.canScrollNext())
		}
		onSelect()
		api.on('select', onSelect)
		api.on('reInit', onSelect)
		api.on('pointerDown', dismissHint)
		return () => {
			api.off('select', onSelect)
			api.off('reInit', onSelect)
			api.off('pointerDown', dismissHint)
		}
	}, [api, dismissHint])

	if (!multiple) {
		return (
			<Image
				src={images[0]}
				alt={`${title} screenshot`}
				fill
				priority={priority}
				sizes="(max-width: 1024px) 100vw, 50vw"
				className="object-cover object-top"
				style={{ objectPosition: imageObjectPositions?.[0] }}
			/>
		)
	}

	return (
		<Carousel
			opts={{ loop: false, align: 'start' }}
			setApi={setApi}
			tabIndex={0}
			aria-label={`${title} screenshots`}
			className="group/gallery absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
			<CarouselContent className="ml-0">
				{images.map((src, i) => (
					<CarouselItem key={imageKey(src)} aria-label={`Screenshot ${i + 1} of ${total}`} className="pl-0">
						<div className="relative aspect-[16/10] w-full">
							<Image
								src={src}
								alt={`${title} screenshot ${i + 1} of ${total}`}
								fill
								priority={priority && i === 0}
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-top"
								style={{ objectPosition: imageObjectPositions?.[i] }}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>

			{/* Arrows — overlaid, vertically centered, disabled at the ends. */}
			<button
				type="button"
				aria-label="Previous screenshot"
				disabled={!canScrollPrev}
				onClick={() => {
					api?.scrollPrev()
					dismissHint()
				}}
				className={cn(
					'absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-background/70 text-primary backdrop-blur-sm transition',
					'hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
					'disabled:pointer-events-none disabled:opacity-0',
				)}>
				<ChevronLeft className="h-4 w-4" />
			</button>
			<button
				type="button"
				aria-label="Next screenshot"
				disabled={!canScrollNext}
				onClick={() => {
					api?.scrollNext()
					dismissHint()
				}}
				className={cn(
					'absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-background/70 text-primary backdrop-blur-sm transition',
					'hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
					'disabled:pointer-events-none disabled:opacity-0',
				)}>
				<ChevronRight className="h-4 w-4" />
			</button>

			<p className="sr-only" aria-live="polite" aria-atomic="true">
				{title}: screenshot {selectedIndex + 1} of {total}
			</p>

			{/* Dot page indicator. */}
			<div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 items-center" role="group" aria-label={`Choose a ${title} screenshot`}>
				{images.map((src, i) => (
					<button
						key={imageKey(src)}
						type="button"
						aria-label={`Show screenshot ${i + 1} of ${total}`}
						aria-current={i === selectedIndex}
						onClick={() => {
							api?.scrollTo(i)
							dismissHint()
						}}
						className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
						<span
							aria-hidden="true"
							className={cn(
								'h-1.5 rounded-full transition-all',
								i === selectedIndex ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/40 hover:bg-primary/60',
							)}
						/>
					</button>
				))}
			</div>

			{/* First-visit hint: right-edge peek + pulsing chevron. */}
			{showHint && (
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-20 items-center justify-end bg-gradient-to-l from-background/85 via-background/40 to-transparent pr-3">
					<ChevronRight className="gallery-hint-chevron h-6 w-6 text-primary text-glow" />
				</div>
			)}
		</Carousel>
	)
}
